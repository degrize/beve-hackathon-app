package com.hackathon.beve.service.mapper;

import com.hackathon.beve.domain.Aide;
import com.hackathon.beve.service.dto.AideDTO;
import org.mapstruct.Mapper;

/**
 * Mapper for the entity {@link Aide} and its DTO {@link AideDTO}.
 */
@Mapper(componentModel = "spring")
public interface AideMapper extends EntityMapper<AideDTO, Aide> {}
