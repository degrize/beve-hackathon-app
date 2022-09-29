package com.hackathon.beve.repository;

import com.hackathon.beve.domain.Aide;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Aide entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AideRepository extends JpaRepository<Aide, Long> {}
