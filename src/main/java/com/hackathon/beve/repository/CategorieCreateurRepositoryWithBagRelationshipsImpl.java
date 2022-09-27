package com.hackathon.beve.repository;

import com.hackathon.beve.domain.CategorieCreateur;
import com.hackathon.beve.domain.CreateurAfricain;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.stream.IntStream;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.hibernate.annotations.QueryHints;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;

/**
 * Utility repository to load bag relationships based on https://vladmihalcea.com/hibernate-multiplebagfetchexception/
 */
public class CategorieCreateurRepositoryWithBagRelationshipsImpl implements CategorieCreateurRepositoryWithBagRelationships {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<CategorieCreateur> fetchBagRelationships(List<CategorieCreateur> categorieCreateurs) {
        return Optional.of(categorieCreateurs).map(this::fetchCreateurAfricains).orElse(Collections.emptyList());
    }

    List<CategorieCreateur> fetchCreateurAfricains(List<CategorieCreateur> categorieCreateurs) {
        HashMap<Object, Integer> order = new HashMap<>();
        IntStream.range(0, categorieCreateurs.size()).forEach(index -> order.put(categorieCreateurs.get(index).getId(), index));
        List<CategorieCreateur> result = entityManager
            .createQuery(
                "select distinct categorieCreateur from CategorieCreateur categorieCreateur left join fetch categorieCreateur.createurAfricains where categorieCreateur in :categorieCreateurs",
                CategorieCreateur.class
            )
            .setParameter("categorieCreateurs", categorieCreateurs)
            .setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
            .getResultList();
        Collections.sort(result, (o1, o2) -> Integer.compare(order.get(o1.getId()), order.get(o2.getId())));
        return result;
    }
}
