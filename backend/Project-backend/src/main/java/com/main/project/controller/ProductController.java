package com.main.project.controller;

import com.main.project.model.Product;
import com.main.project.service.ProductService;
import com.main.seller.model.Seller;
import com.main.seller.service.SellerService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000") // Allow React Frontend
@RestController
@RequestMapping("/api/products")
public class ProductController {
    
    @Autowired
    private ProductService productService;
    
    @Autowired
    private SellerService sellerService; // Service to fetch seller details

    // Get all products
    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    // Get product by ID
    @GetMapping("/{pid}")
    public ResponseEntity<Product> getProductById(@PathVariable Long pid) {
        Optional<Product> product = productService.getProductById(pid);
        return product.map(ResponseEntity::ok)
                      .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Add a new product with Seller ID
    @PostMapping("/add")
    public ResponseEntity<Product> addProduct(
            @RequestParam("name") String name,
            @RequestParam("price") double price,
            @RequestParam("category") String category,
            @RequestParam("image") MultipartFile image,
            @RequestParam("sellerId") Long sellerId) {
        try {
            Optional<Seller> seller = sellerService.getSellerById(sellerId);
            if (!seller.isPresent()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
            }

            // Save Image Correctly
            String imageUrl = "/api/products/images/" + image.getOriginalFilename();
            productService.saveImage(image);

            // Save Product
            Product product = new Product(name, price, category, imageUrl, seller.get());
            productService.saveProduct(product);

            return ResponseEntity.ok(product);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    // Get Products by Seller ID
    @GetMapping("/seller/{sid}")
    public ResponseEntity<List<Product>> getProductsBySeller(@PathVariable Long sid) {
        System.out.println("Fetching products for sid: " + sid);  // ✅ Debug log

        List<Product> products = productService.getProductsBySeller(sid);

        if (products == null || products.isEmpty()) {
            return ResponseEntity.ok(Collections.emptyList());  // ✅ Return empty list instead of 404
        }

        return ResponseEntity.ok(products);
    }


    // Serve images from uploads folder
    @GetMapping("/images/{filename}")
    public ResponseEntity<Resource> getImage(@PathVariable String filename) {
        try {
            Path filePath = Paths.get("uploads").resolve(filename);
            Resource resource = new UrlResource(filePath.toUri());

            if (!resource.exists() || !resource.isReadable()) {
                return ResponseEntity.notFound().build();
            }

            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_TYPE, Files.probeContentType(filePath))
                    .body(resource);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Upload image separately
    @PostMapping("/upload")
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file) throws IOException {
        String imageUrl = productService.saveImage(file);
        return ResponseEntity.ok(imageUrl);
    }

    // Delete a product
    @DeleteMapping("/{pid}")
    public ResponseEntity<String> deleteProduct(@PathVariable Long pid) {
        productService.deleteProduct(pid);
        return ResponseEntity.ok("Product deleted successfully");
    }
}
