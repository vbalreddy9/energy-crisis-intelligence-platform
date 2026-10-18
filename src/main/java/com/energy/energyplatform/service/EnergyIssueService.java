package com.energy.energyplatform.service;

import com.energy.energyplatform.model.EnergyIssue;
import com.energy.energyplatform.repository.EnergyIssueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EnergyIssueService {

    @Autowired
    private EnergyIssueRepository repository;

    public EnergyIssue saveIssue(EnergyIssue issue) {
        return repository.save(issue);
    }

    public List<EnergyIssue> getAllIssues() {
        return repository.findAll();
    }

    public EnergyIssue updateStatus(Long id, String status) {

        EnergyIssue issue =
                repository.findById(id).orElse(null);

        if (issue != null) {

            issue.setStatus(status);

            return repository.save(issue);
        }

        return null;
    }
}