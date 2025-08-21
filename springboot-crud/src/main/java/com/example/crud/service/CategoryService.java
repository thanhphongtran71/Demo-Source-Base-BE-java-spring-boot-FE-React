package com.example.crud.service;

import com.example.crud.dto.CategoryDTO;
import com.example.crud.entity.Category;
import com.example.crud.exception.ResourceNotFoundException;
import com.example.crud.repository.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    // Create
    public CategoryDTO createCategory(CategoryDTO dto) {
        Category category = new Category();
        category.setName(dto.getName());
        Category saved = categoryRepository.save(category);
        return new CategoryDTO(saved.getId(), saved.getName());
    }

    // Read all
    public List<CategoryDTO> getAllCategories() {
        return categoryRepository.findAll().stream()
                .map(c -> new CategoryDTO(c.getId(), c.getName()))
                .collect(Collectors.toList());
    }

    // Read by ID
    public CategoryDTO getCategoryById(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + id));
        return new CategoryDTO(category.getId(), category.getName());
    }

    // Update
    public CategoryDTO updateCategory(Long id, CategoryDTO dto) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + id));
        category.setName(dto.getName());
        Category updated = categoryRepository.save(category);
        return new CategoryDTO(updated.getId(), updated.getName());
    }

    // Delete
    public void deleteCategory(Long id) {
        if (!categoryRepository.existsById(id)) {
            throw new ResourceNotFoundException("Category not found with id: " + id);
        }
        categoryRepository.deleteById(id);
    }
}
