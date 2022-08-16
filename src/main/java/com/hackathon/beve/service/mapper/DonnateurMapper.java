package com.hackathon.beve.service.mapper;

import com.hackathon.beve.domain.Donnateur;
import com.hackathon.beve.service.dto.DonnateurDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Donnateur} and its DTO {@link DonnateurDTO}.
 */
@Mapper(componentModel = "spring")
public interface DonnateurMapper extends EntityMapper<DonnateurDTO, Donnateur> {}
