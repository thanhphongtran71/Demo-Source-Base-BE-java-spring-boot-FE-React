package com.example.crud.service;

import com.example.crud.dto.ProductDTO;
import com.example.crud.entity.Category;
import com.example.crud.entity.Product;
import com.example.crud.exception.ResourceNotFoundException;
import com.example.crud.repository.CategoryRepository;
import com.example.crud.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    public ProductService(ProductRepository productRepository,
                          CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }

    // Create
    public ProductDTO createProduct(ProductDTO dto) {
        Category category = categoryRepository.findById(dto.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + dto.getCategoryId()));

        Product product = new Product();
        product.setName(dto.getName());
        product.setPrice(dto.getPrice());
        product.setCategory(category);

        Product saved = productRepository.save(product);
        return new ProductDTO(saved.getId(), saved.getName(), saved.getPrice(), saved.getCategory().getId());
    }

    // Read all
    public List<ProductDTO> getAllProducts() {
        return productRepository.findAll().stream()
                .map(p -> new ProductDTO(p.getId(), p.getName(), p.getPrice(),
                        p.getCategory() != null ? p.getCategory().getId() : null))
                .collect(Collectors.toList());
    }

    // Read by ID
    public ProductDTO getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
        return new ProductDTO(product.getId(), product.getName(), product.getPrice(),
                product.getCategory() != null ? product.getCategory().getId() : null);
    }

    // Update
    public ProductDTO updateProduct(Long id, ProductDTO dto) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));

        Category category = categoryRepository.findById(dto.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + dto.getCategoryId()));

        product.setName(dto.getName());
        product.setPrice(dto.getPrice());
        product.setCategory(category);

        Product updated = productRepository.save(product);
        return new ProductDTO(updated.getId(), updated.getName(), updated.getPrice(), updated.getCategory().getId());
    }

    // Delete
    public void deleteProduct(Long id) {
        if (!productRepository.existsById(id)) {
            throw new ResourceNotFoundException("Product not found with id: " + id);
        }
        productRepository.deleteById(id);
    }
}
