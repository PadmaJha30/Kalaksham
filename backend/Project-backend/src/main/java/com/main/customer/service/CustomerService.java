package com.main.customer.service;

import com.main.customer.dao.CustomerRepository;
import com.main.customer.model.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class CustomerService {
    
    @Autowired
    private CustomerRepository customerRepository;

    // Get all customers
    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    // Get customer by ID
    public Optional<Customer> getCustomerById(Long id) {
        return customerRepository.findById(id);
    }

    // Register a new customer
    public Customer saveCustomer(Customer customer) {
        return customerRepository.save(customer);
    }
    public Customer findByEmail(String email) {
        Optional<Customer> customer = customerRepository.findByEmail(email);
        return customer.orElse(null);  // ✅ Return customer or null if not found
    }
    
    // Update customer details
    public Optional<Customer> updateCustomer(Long id, Customer updatedCustomer) {
        return customerRepository.findById(id).map(existingCustomer -> {
            existingCustomer.setName(updatedCustomer.getName());
            existingCustomer.setEmail(updatedCustomer.getEmail());
            existingCustomer.setContact(updatedCustomer.getContact());
            existingCustomer.setAddress(updatedCustomer.getAddress());
            existingCustomer.setSex(updatedCustomer.getSex());
            
            existingCustomer.setCity(updatedCustomer.getCity());
            existingCustomer.setState(updatedCustomer.getState());
            existingCustomer.setPassword(updatedCustomer.getPassword());
            return customerRepository.save(existingCustomer);
        });
    }

    // Delete customer
    public void deleteCustomer(Long id) {
        customerRepository.deleteById(id);
    }
    
//    public Optional<Customer> findByEmail(String email) {
//        return customerRepository.findByEmail(email);
//    }
}
