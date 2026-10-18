package com.energy.energyplatform.repository;

import com.energy.energyplatform.model.EnergyData;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EnergyDataRepository extends JpaRepository<EnergyData, Long> {

}