package com.example.crud.service;

import com.example.crud.dto.CafeTableDTO;
import com.example.crud.entity.CafeTable;
import com.example.crud.exception.ResourceNotFoundException;
import com.example.crud.repository.CafeTableRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CafeTableService {

    private final CafeTableRepository cafeTableRepository;

    public CafeTableService(CafeTableRepository cafeTableRepository) {
        this.cafeTableRepository = cafeTableRepository;
    }

    // Create
    public CafeTableDTO createTable(CafeTableDTO dto) {
        CafeTable table = new CafeTable();
        table.setTableNumber(dto.getTableNumber());
        table.setStatus(dto.getStatus() != null ? dto.getStatus() : "Available");
        CafeTable saved = cafeTableRepository.save(table);
        return new CafeTableDTO(saved.getTableId(), saved.getTableNumber(), saved.getStatus());
    }

    // Read all
    public List<CafeTableDTO> getAllTables() {
        return cafeTableRepository.findAll().stream()
                .map(t -> new CafeTableDTO(t.getTableId(), t.getTableNumber(), t.getStatus()))
                .collect(Collectors.toList());
    }

    // Read by ID
    public CafeTableDTO getTableById(Long id) {
        CafeTable table = cafeTableRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Table not found with id: " + id));
        return new CafeTableDTO(table.getTableId(), table.getTableNumber(), table.getStatus());
    }

    // Update
    public CafeTableDTO updateTable(Long id, CafeTableDTO dto) {
        CafeTable table = cafeTableRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Table not found with id: " + id));
        table.setTableNumber(dto.getTableNumber());
        table.setStatus(dto.getStatus());
        CafeTable updated = cafeTableRepository.save(table);
        return new CafeTableDTO(updated.getTableId(), updated.getTableNumber(), updated.getStatus());
    }

    // Delete
    public void deleteTable(Long id) {
        if (!cafeTableRepository.existsById(id)) {
            throw new ResourceNotFoundException("Table not found with id: " + id);
        }
        cafeTableRepository.deleteById(id);
    }
}
