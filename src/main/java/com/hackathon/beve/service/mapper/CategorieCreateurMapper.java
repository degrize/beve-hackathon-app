package com.hackathon.beve.service.mapper;

import com.hackathon.beve.domain.CategorieCreateur;
import com.hackathon.beve.service.dto.CategorieCreateurDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link CategorieCreateur} and its DTO {@link CategorieCreateurDTO}.
 */
@Mapper(componentModel = "spring")
public interface CategorieCreateurMapper extends EntityMapper<CategorieCreateurDTO, CategorieCreateur> {}
