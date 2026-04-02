package com.bhargav.complaint_management_system.repository;

import com.bhargav.complaint_management_system.model.Complaint;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ComplaintRepository extends JpaRepository<Complaint, Long> {
}