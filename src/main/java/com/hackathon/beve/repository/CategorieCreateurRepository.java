package com.hackathon.beve.repository;

import com.hackathon.beve.domain.CategorieCreateur;
import com.hackathon.beve.domain.CreateurAfricain;
import java.util.List;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the CategorieCreateur entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CategorieCreateurRepository
    extends CategorieCreateurRepositoryWithBagRelationships, JpaRepository<CategorieCreateur, Long> {
    default List<CategorieCreateur> findAllWithEagerRelationships() {
        return this.fetchBagRelationships(this.findAll(Sort.by(Sort.Direction.DESC, "id")));
    }
}
