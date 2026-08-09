package com.bhargav.complaint_management_system;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import com.bhargav.complaint_management_system.model.User;
import com.bhargav.complaint_management_system.repository.UserRepository;

@SpringBootApplication
public class ComplaintManagementSystemApplication {

	public static void main(String[] args) {
		SpringApplication.run(ComplaintManagementSystemApplication.class, args);
	}

	@Bean
	CommandLineRunner init(UserRepository userRepository) {
		return args -> {
			if (userRepository.findByUsername("admin").isEmpty()) {
				User admin = new User();
				admin.setUsername("admin");
				admin.setPassword("admin");
				admin.setRole("ADMIN");
				userRepository.save(admin);
				System.out.println("Admin user seeded: admin / admin");
			}
		};
	}
}
