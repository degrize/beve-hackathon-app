package com.hackathon.beve.repository;

import com.hackathon.beve.domain.CategorieCreateur;
import java.util.List;

public interface CategorieCreateurRepositoryWithBagRelationships {
    List<CategorieCreateur> fetchBagRelationships(List<CategorieCreateur> categorieCreateur);
}
