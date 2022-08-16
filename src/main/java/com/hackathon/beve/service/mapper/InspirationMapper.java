package com.hackathon.beve.service.mapper;

import com.hackathon.beve.domain.Inspiration;
import com.hackathon.beve.service.dto.InspirationDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Inspiration} and its DTO {@link InspirationDTO}.
 */
@Mapper(componentModel = "spring")
public interface InspirationMapper extends EntityMapper<InspirationDTO, Inspiration> {}
