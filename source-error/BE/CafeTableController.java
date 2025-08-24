package com.example.crud.controller;

import com.example.crud.dto.CafeTableDTO;
import com.example.crud.service.CafeTableService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/tables")
public class CafeTableController {

    private final CafeTableService cafeTableService;

    public CafeTableController(CafeTableService cafeTableService) {
        this.cafeTableService = cafeTableService;
    }

    @GetMapping
    public ResponseEntity<List<CafeTableDTO>> getAllTables() {
        return ResponseEntity.ok(cafeTableService.getAllTables());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CafeTableDTO> getTableById(@PathVariable Long id) {
        return ResponseEntity.ok(cafeTableService.getTableById(id));
    }

    @PostMapping
    public ResponseEntity<CafeTableDTO> createTable(@RequestBody CafeTableDTO dto) {
        return ResponseEntity.ok(cafeTableService.createTable(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CafeTableDTO> updateTable(@PathVariable Long id, @RequestBody CafeTableDTO dto) {
        return ResponseEntity.ok(cafeTableService.updateTable(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTable(@PathVariable Long id) {
        cafeTableService.deleteTable(id);
        return ResponseEntity.ok("Table deleted successfully!");
    }
}
