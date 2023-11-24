package com.project.student.controller;

import java.nio.file.Paths;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.project.student.model.Student;
import com.project.student.service.StudentService;

@RestController
@RequestMapping("/student")
@CrossOrigin
public class StudentController {
 
    @Autowired
    private StudentService studentService;
    @PostMapping("/add")
     public ResponseEntity<String> addStudent(@RequestParam("name") String name,
                                            @RequestParam("address") String address,
                                            @RequestParam("image") MultipartFile image) {
         Student student = new Student();
        student.setName(name);
        student.setAddress(address);
        studentService.saveStudent(student, image);
        String imagePath = student.getImagePath();

        // Create the complete URL for the image
        String imageUrl = "/images/" + Paths.get(imagePath).getFileName().toString();

        // Return the image URL in the response body
        return new ResponseEntity<>(imageUrl, HttpStatus.OK);

    }

    @GetMapping("/getAll")
    public List<Student> getAllStudents(){
    return studentService.getAllStudents();
    }

    @DeleteMapping("/delete/{studentId}")
    public String deleteStudent(@PathVariable(name = "studentId") Long studentId) {
        studentService.deleteStudent(studentId);
        return "Student with ID " + studentId + " has been deleted";
    }
    @PutMapping("/update/{studentId}")
    public String updateStudent(@PathVariable Long studentId, @RequestBody Student updatedStudent) {
        studentService.updateStudent(studentId, updatedStudent);
        return "Student with ID " + studentId + " has been updated";
    }
    
}
