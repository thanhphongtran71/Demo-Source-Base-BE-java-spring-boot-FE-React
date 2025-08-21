package com.example.crud.dto;

import jakarta.validation.constraints.NotBlank;

public class CategoryDTO {
    private Long id;

    @NotBlank(message = "Category name is required")
    private String name;

    public CategoryDTO() {}

    public CategoryDTO(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    // Getter & Setter
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
}
