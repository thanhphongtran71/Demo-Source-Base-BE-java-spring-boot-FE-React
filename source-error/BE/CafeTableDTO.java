package com.example.crud.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CafeTableDTO {
    private Long tableId;
    private Integer tableNumber;
    private String status; // Available, Occupied, Reserved
}
