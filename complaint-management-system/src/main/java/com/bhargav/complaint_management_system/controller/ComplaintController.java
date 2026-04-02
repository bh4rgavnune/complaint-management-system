package com.bhargav.complaint_management_system.controller;

import com.bhargav.complaint_management_system.model.Complaint;
import com.bhargav.complaint_management_system.repository.ComplaintRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/complaints")
@CrossOrigin(origins = "http://localhost:5173")
public class ComplaintController {

    @Autowired
    private ComplaintRepository repo;

    @GetMapping
    public List<Complaint> getAll() {
        return repo.findAll();   // now fetching from DB
    }
    
    @GetMapping("/id/{id}")
    public Complaint getById(@PathVariable Long id) {
        return repo.findById(id).orElse(null);
    }

    @PostMapping
    public Complaint createComplaint(@RequestBody Complaint complaint) {
        return repo.save(complaint);   // saving to DB
    }
    
    @DeleteMapping("/{id}")
    public String deleteComplaint(@PathVariable Long id) {
        repo.deleteById(id);
        return "Deleted successfully";
    }
    
    @PutMapping("/{id}")
    public Complaint updateComplaint(@PathVariable Long id, @RequestBody Complaint updatedComplaint) {
        Complaint existing = repo.findById(id).orElse(null);

        if (existing != null) {
            existing.setTitle(updatedComplaint.getTitle());
            existing.setDescription(updatedComplaint.getDescription());
            existing.setCategory(updatedComplaint.getCategory());
            return repo.save(existing);
        }

        return null;
    }
}