package com.main.project.service;

import com.main.project.dao.ProductRepository;
import com.main.project.model.Product;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;


@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public List<Product> getAllProducts() {
    	List<Product> products = productRepository.findAll();
    	System.out.println("Returning Products" + products);
        return products;
    }

    public Optional<Product> getProductById(Long pid) {
        return productRepository.findByPid(pid); // Updated method name
    }

    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

    public void deleteProduct(Long pid) {
        productRepository.deleteByPid(pid); // Updated method name
    }
    
    public List<Product> getProductsBySeller(Long sid) {  // ✅ Updated method name
        return productRepository.findBySeller_Sid(sid);
    }

    private static final String UPLOAD_DIR = "src/main/resources/static/images/";

    public String saveImage(MultipartFile file) throws IOException {
        if (file.isEmpty()) {
            throw new IOException("File is empty");
        }

        // Create directory if not exists
        File directory = new File(UPLOAD_DIR);
        if (!directory.exists()) {
            directory.mkdirs();
        }

        // Get original file name
        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
        Path filePath = Paths.get(UPLOAD_DIR + fileName);

        // Save file to directory
        Files.write(filePath, file.getBytes());

        // Return stored file path (relative path for frontend)
        return "/images/" + fileName;
    }
}
