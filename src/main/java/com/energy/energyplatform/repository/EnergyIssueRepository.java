package com.energy.energyplatform.repository;

import com.energy.energyplatform.model.EnergyIssue;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EnergyIssueRepository
        extends JpaRepository<EnergyIssue, Long> {
}