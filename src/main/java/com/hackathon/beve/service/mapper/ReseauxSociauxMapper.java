package com.hackathon.beve.service.mapper;

import com.hackathon.beve.domain.ReseauxSociaux;
import com.hackathon.beve.service.dto.ReseauxSociauxDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link ReseauxSociaux} and its DTO {@link ReseauxSociauxDTO}.
 */
@Mapper(componentModel = "spring")
public interface ReseauxSociauxMapper extends EntityMapper<ReseauxSociauxDTO, ReseauxSociaux> {}
