package com.employe.config;

import com.employe.model.Role;
import com.employe.repository.RoleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Autowired;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public void run(String... args) throws Exception {
        // Crée les rôles uniquement s'ils n'existent pas déjà
        if (!roleRepository.existsByName("ROLE_ADMIN")) {
            roleRepository.save(new Role(null, "ROLE_ADMIN"));
        }
        if (!roleRepository.existsByName("ROLE_EMPLOYE")) {
            roleRepository.save(new Role(null, "ROLE_EMPLOYE"));
        }
        if (!roleRepository.existsByName("ROLE_APPROBATEUR")) {
            roleRepository.save(new Role(null, "ROLE_APPROBATEUR"));
        }

        System.out.println("✅ Rôles initialisés en base de données");
    }

}
