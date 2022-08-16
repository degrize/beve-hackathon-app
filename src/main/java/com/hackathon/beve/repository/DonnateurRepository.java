package com.hackathon.beve.repository;

import com.hackathon.beve.domain.Donnateur;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Donnateur entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DonnateurRepository extends JpaRepository<Donnateur, Long> {}
