package com.hackathon.beve.repository;

import com.hackathon.beve.domain.CreateurAfricain;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;

public interface CreateurAfricainRepositoryWithBagRelationships {
    Optional<CreateurAfricain> fetchBagRelationships(Optional<CreateurAfricain> createurAfricain);

    List<CreateurAfricain> fetchBagRelationships(List<CreateurAfricain> createurAfricains);

    Page<CreateurAfricain> fetchBagRelationships(Page<CreateurAfricain> createurAfricains);
}
