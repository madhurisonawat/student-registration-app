package com.project.student.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.project.student.model.Student;

public interface StudentService {
    public Student saveStudent(Student student, MultipartFile imageFile);
    public List<Student> getAllStudents();
    public void deleteStudent(Long studentId);
    public  void updateStudent(Long studentId, Student updatedStudent);
         
}
