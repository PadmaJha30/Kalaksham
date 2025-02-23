package com.main.customer.dao;

import com.main.customer.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {
    
    // Find customer by email (for login & validation)
    Optional<Customer> findByEmail(String email);
    
    // Find customer by phone number
    Optional<Customer> findByContact(String contact);

	Optional<Customer> findById(Long id);

	void deleteById(Long id);
	
	
}
