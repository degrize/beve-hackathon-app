package com.hackathon.beve.repository;

import com.hackathon.beve.domain.ReseauxSociaux;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the ReseauxSociaux entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ReseauxSociauxRepository extends JpaRepository<ReseauxSociaux, Long> {}
