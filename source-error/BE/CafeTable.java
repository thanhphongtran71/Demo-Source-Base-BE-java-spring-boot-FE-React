package com.example.crud.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Tables") // map tới bảng Tables trong SQL
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CafeTable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tableId;

    @Column(nullable = false, unique = true)
    private Integer tableNumber; // số bàn (1 - 40)

    @Column(nullable = false)
    private String status = "Available"; // Available, Occupied, Reserved
}
