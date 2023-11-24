package com.project.student.service;


import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.project.student.model.Student;
import com.project.student.repository.StudentRepository;

@Service
public class StudentServiceImpl implements StudentService{
    
    @Autowired
    private StudentRepository studentRepository;

    private boolean isImageFileValid(MultipartFile file) {
        // Check if the content type is PNG or JPEG or JPG
        String contentType = file.getContentType();
        return contentType != null && (contentType.equals(MediaType.IMAGE_PNG_VALUE) || contentType.equals(MediaType.IMAGE_JPEG_VALUE));
    }
    @Override
    public Student saveStudent(Student student, MultipartFile imageFile){
        if (imageFile != null && !imageFile.isEmpty()) {
            // Check if the uploaded file is a PNG or JPEG image
            if (isImageFileValid(imageFile)) {
                String uploadDir = "./uploads/";
                Path uploadPath = Paths.get(uploadDir);

                try {
                    if (!Files.exists(uploadPath)) {
                        Files.createDirectories(uploadPath);
                    }

                    // Save the file
                    String fileName = StringUtils.cleanPath(imageFile.getOriginalFilename());
                    Path filePath = uploadPath.resolve(fileName);
                    Files.copy(imageFile.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
                    String imageUrl = "/images/" + fileName;  // Construct the imageUrl
                    student.setImagePath(imageUrl);
                } catch (IOException e) {
                    // Handle the exception, e.g., log it or show an error message
                }
            } else {
                // Handle the case where the uploaded file is not a PNG or JPEG image
                // You might want to show an error message or reject the upload
            }
        }
        return studentRepository.save(student);
    }
    @Override
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }
    @Override
    public void deleteStudent(Long studentId) {
        studentRepository.deleteById(studentId);
    }
    @Override
    public void updateStudent(Long studentId, Student updatedStudent) {
        Student existingStudent = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student with ID " + studentId + " not found"));

        // Update the existing student with the fields from the updatedStudent
        existingStudent.setName(updatedStudent.getName());
        existingStudent.setAddress(updatedStudent.getAddress());
        // Save the updated student
         studentRepository.save(existingStudent);
    }
}
