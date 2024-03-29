package com.hackathon.beve.repository;

import com.hackathon.beve.domain.CreateurAfricain;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the CreateurAfricain entity.
 *
 * When extending this class, extend CreateurAfricainRepositoryWithBagRelationships too.
 * For more information refer to https://github.com/jhipster/generator-jhipster/issues/17990.
 */
@Repository
public interface CreateurAfricainRepository extends CreateurAfricainRepositoryWithBagRelationships, JpaRepository<CreateurAfricain, Long> {
    default Optional<CreateurAfricain> findOneWithEagerRelationships(Long id) {
        return this.fetchBagRelationships(this.findById(id));
    }

    default List<CreateurAfricain> findAllWithEagerRelationships() {
        return this.fetchBagRelationships(this.findAll(Sort.by(Sort.Direction.DESC, "id")));
    }

    default Page<CreateurAfricain> findAllWithEagerRelationships(Pageable pageable) {
        return this.fetchBagRelationships(this.findAll(pageable));
    }

    @Query(
        "select createurafricain from CreateurAfricain createurafricain left join fetch createurafricain.jhiUser left join fetch createurafricain.categorieCreateurs left join fetch createurafricain.inspirations left join fetch createurafricain.souscriptions left join fetch createurafricain.reseauxSociauxes where createurafricain.jhiUser.id =:id"
    )
    CreateurAfricain findByJhiUserId(@Param("id") Long id);

    Optional<CreateurAfricain> findCreateurAfricainByLabel(String label);
}
