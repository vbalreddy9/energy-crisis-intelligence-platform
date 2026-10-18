package com.energy.energyplatform.controller;

import com.energy.energyplatform.model.EnergyIssue;
import com.energy.energyplatform.service.EnergyIssueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/issues")
@CrossOrigin(origins = "*")
public class EnergyIssueController {

    @Autowired
    private EnergyIssueService service;

    @PostMapping("/report")
    public EnergyIssue reportIssue(
            @RequestBody EnergyIssue issue) {

        return service.saveIssue(issue);
    }

    @GetMapping("/all")
    public List<EnergyIssue> getAllIssues() {

        return service.getAllIssues();
    }

    @PutMapping("/resolve/{id}")
    public EnergyIssue resolveIssue(
            @PathVariable Long id) {

        return service.updateStatus(
                id,
                "RESOLVED"
        );
    }
}