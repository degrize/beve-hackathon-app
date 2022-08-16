package com.hackathon.beve.repository;

import com.hackathon.beve.domain.Inspiration;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Inspiration entity.
 */
@SuppressWarnings("unused")
@Repository
public interface InspirationRepository extends JpaRepository<Inspiration, Long> {}
