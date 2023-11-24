package com.project.student.controller;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/images")
public class ImageController {

    @GetMapping("/{filename:.+}")
    public ResponseEntity<Resource> serveImage(@PathVariable String filename) {
        try {
            Path imagePath = Paths.get("uploads").resolve(filename);
            Resource imageResource = new UrlResource(imagePath.toUri());

            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline;filename=" + filename)
                    .contentType(MediaType.IMAGE_JPEG)  // Adjust the media type based on your image type
                    .body(imageResource);
        } catch (IOException e) {
            // Handle exceptions (e.g., log the error)
            e.printStackTrace();
            return ResponseEntity.notFound().build();
        }
    }
}

