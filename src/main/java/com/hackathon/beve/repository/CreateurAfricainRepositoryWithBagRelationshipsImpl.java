package com.hackathon.beve.repository;

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
public class CreateurAfricainRepositoryWithBagRelationshipsImpl implements CreateurAfricainRepositoryWithBagRelationships {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Optional<CreateurAfricain> fetchBagRelationships(Optional<CreateurAfricain> createurAfricain) {
        return createurAfricain.map(this::fetchInspirations).map(this::fetchCategorieCreateurs).map(this::fetchReseauxSociauxes);
    }

    @Override
    public Page<CreateurAfricain> fetchBagRelationships(Page<CreateurAfricain> createurAfricains) {
        return new PageImpl<>(
            fetchBagRelationships(createurAfricains.getContent()),
            createurAfricains.getPageable(),
            createurAfricains.getTotalElements()
        );
    }

    @Override
    public List<CreateurAfricain> fetchBagRelationships(List<CreateurAfricain> createurAfricains) {
        return Optional
            .of(createurAfricains)
            .map(this::fetchInspirations)
            .map(this::fetchCategorieCreateurs)
            .map(this::fetchReseauxSociauxes)
            .orElse(Collections.emptyList());
    }

    CreateurAfricain fetchInspirations(CreateurAfricain result) {
        return entityManager
            .createQuery(
                "select createurAfricain from CreateurAfricain createurAfricain left join fetch createurAfricain.inspirations where createurAfricain is :createurAfricain",
                CreateurAfricain.class
            )
            .setParameter("createurAfricain", result)
            .setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
            .getSingleResult();
    }

    List<CreateurAfricain> fetchInspirations(List<CreateurAfricain> createurAfricains) {
        HashMap<Object, Integer> order = new HashMap<>();
        IntStream.range(0, createurAfricains.size()).forEach(index -> order.put(createurAfricains.get(index).getId(), index));
        List<CreateurAfricain> result = entityManager
            .createQuery(
                "select distinct createurAfricain from CreateurAfricain createurAfricain left join fetch createurAfricain.inspirations where createurAfricain in :createurAfricains",
                CreateurAfricain.class
            )
            .setParameter("createurAfricains", createurAfricains)
            .setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
            .getResultList();
        Collections.sort(result, (o1, o2) -> Integer.compare(order.get(o1.getId()), order.get(o2.getId())));
        return result;
    }

    CreateurAfricain fetchCategorieCreateurs(CreateurAfricain result) {
        return entityManager
            .createQuery(
                "select createurAfricain from CreateurAfricain createurAfricain left join fetch createurAfricain.categorieCreateurs where createurAfricain is :createurAfricain",
                CreateurAfricain.class
            )
            .setParameter("createurAfricain", result)
            .setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
            .getSingleResult();
    }

    List<CreateurAfricain> fetchCategorieCreateurs(List<CreateurAfricain> createurAfricains) {
        HashMap<Object, Integer> order = new HashMap<>();
        IntStream.range(0, createurAfricains.size()).forEach(index -> order.put(createurAfricains.get(index).getId(), index));
        List<CreateurAfricain> result = entityManager
            .createQuery(
                "select distinct createurAfricain from CreateurAfricain createurAfricain left join fetch createurAfricain.categorieCreateurs where createurAfricain in :createurAfricains",
                CreateurAfricain.class
            )
            .setParameter("createurAfricains", createurAfricains)
            .setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
            .getResultList();
        Collections.sort(result, (o1, o2) -> Integer.compare(order.get(o1.getId()), order.get(o2.getId())));
        return result;
    }

    CreateurAfricain fetchReseauxSociauxes(CreateurAfricain result) {
        return entityManager
            .createQuery(
                "select createurAfricain from CreateurAfricain createurAfricain left join fetch createurAfricain.reseauxSociauxes where createurAfricain is :createurAfricain",
                CreateurAfricain.class
            )
            .setParameter("createurAfricain", result)
            .setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
            .getSingleResult();
    }

    List<CreateurAfricain> fetchReseauxSociauxes(List<CreateurAfricain> createurAfricains) {
        HashMap<Object, Integer> order = new HashMap<>();
        IntStream.range(0, createurAfricains.size()).forEach(index -> order.put(createurAfricains.get(index).getId(), index));
        List<CreateurAfricain> result = entityManager
            .createQuery(
                "select distinct createurAfricain from CreateurAfricain createurAfricain left join fetch createurAfricain.reseauxSociauxes where createurAfricain in :createurAfricains",
                CreateurAfricain.class
            )
            .setParameter("createurAfricains", createurAfricains)
            .setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
            .getResultList();
        Collections.sort(result, (o1, o2) -> Integer.compare(order.get(o1.getId()), order.get(o2.getId())));
        return result;
    }
}
