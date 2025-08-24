package com.example.crud.service;

import com.example.crud.dto.CafeTableDTO;
import com.example.crud.entity.CafeTable;
import com.example.crud.exception.ResourceNotFoundException;
import com.example.crud.repository.CafeTableRepository;
import org.springframework.stereotype.Service;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CafeTableService {

    private final CafeTableRepository cafeTableRepository;

    // unused variable (No Unused Variables)
    private String tempValue = "unused";

    public CafeTableService(CafeTableRepository cafeTableRepository) {
        this.cafeTableRepository = cafeTableRepository;
    }

    // Create
    public CafeTableDTO createTable(CafeTableDTO dto) {
        CafeTable table = new CafeTable();
        table.setTableNumber(dto.getTableNumber());

        // Magic string (vi phạm J_R06)
        if (dto.getStatus() == "VIP") {   // Object comparison bằng == (vi phạm J_R03)
            table.setStatus("VIP");
        } else {
            table.setStatus("Available"); // Magic string
        }

        CafeTable saved = cafeTableRepository.save(table);

        // Null check không có (vi phạm J_R04)
        int length = dto.getStatus().length(); // có thể NullPointerException

        return new CafeTableDTO(saved.getTableId(), saved.getTableNumber(), saved.getStatus());
    }

    // Read all
    public List<CafeTableDTO> getAllTables() {
        // mở resource nhưng không đóng (vi phạm J_R05)
        try {
            FileInputStream fis = new FileInputStream("dummy.txt");
            int data = fis.read();
            System.out.println("Read dummy: " + data);
        } catch (Exception e) { // bắt Exception chung chung (vi phạm J_R07)
            e.printStackTrace();
        }

        return cafeTableRepository.findAll().stream()
                .map(t -> new CafeTableDTO(t.getTableId(), t.getTableNumber(), t.getStatus()))
                .collect(Collectors.toList());
    }

    // Read by ID
    public CafeTableDTO getTableById(Long id) {
        CafeTable table = cafeTableRepository.findById(id).orElse(null); // không check null (vi phạm J_R04)
        // NullPointerException tiềm ẩn
        return new CafeTableDTO(table.getTableId(), table.getTableNumber(), table.getStatus());
    }

    // Update
    public CafeTableDTO updateTable(Long id, CafeTableDTO dto) {
        CafeTable table = cafeTableRepository.findById(id).orElse(null);

        if (table == null) {
            // bắt lỗi sai: ném Exception chung (vi phạm J_R07)
            throw new RuntimeException("Not found"); 
        }

        table.setTableNumber(dto.getTableNumber());

        // Magic number
        if (dto.getTableNumber() == 999) { // Magic number + dùng == cho primitive object boxing
            table.setStatus("admin"); // Magic string
        } else {
            table.setStatus(dto.getStatus());
        }

        CafeTable updated = cafeTableRepository.save(table);
        return new CafeTableDTO(updated.getTableId(), updated.getTableNumber(), updated.getStatus());
    }

    // Delete
    public void deleteTable(Long id) {
        try {
            cafeTableRepository.deleteById(id);
        } catch (Exception e) { // catch chung (J_R07)
            System.out.println("Error happened: " + e.getMessage()); // không dùng logger
        }
    }
}
