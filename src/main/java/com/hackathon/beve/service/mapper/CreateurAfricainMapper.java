package com.hackathon.beve.service.mapper;

import com.hackathon.beve.domain.*;
import com.hackathon.beve.service.dto.*;
import java.util.Set;
import java.util.stream.Collectors;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link CreateurAfricain} and its DTO {@link CreateurAfricainDTO}.
 */
@Mapper(componentModel = "spring")
public interface CreateurAfricainMapper extends EntityMapper<CreateurAfricainDTO, CreateurAfricain> {
    @Mapping(target = "inspirations", source = "inspirations", qualifiedByName = "inspirationNomSet")
    @Mapping(target = "categorieCreateurs", source = "categorieCreateurs", qualifiedByName = "categorieCreateurCategorieSet")
    @Mapping(target = "reseauxSociauxes", source = "reseauxSociauxes", qualifiedByName = "reseauxSociauxNomSet")
    @Mapping(target = "user", source = "user", qualifiedByName = "jhiUserId")
    CreateurAfricainDTO toDto(CreateurAfricain s);

    @Mapping(target = "removeInspiration", ignore = true)
    @Mapping(target = "removeCategorieCreateur", ignore = true)
    @Mapping(target = "removeReseauxSociaux", ignore = true)
    CreateurAfricain toEntity(CreateurAfricainDTO createurAfricainDTO);

    @Named("inspirationNom")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "nom", source = "nom")
    InspirationDTO toDtoInspirationNom(Inspiration inspiration);

    @Named("inspirationNomSet")
    default Set<InspirationDTO> toDtoInspirationNomSet(Set<Inspiration> inspiration) {
        return inspiration.stream().map(this::toDtoInspirationNom).collect(Collectors.toSet());
    }

    @Named("categorieCreateurCategorie")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "categorie", source = "categorie")
    CategorieCreateurDTO toDtoCategorieCreateurCategorie(CategorieCreateur categorieCreateur);

    @Named("categorieCreateurCategorieSet")
    default Set<CategorieCreateurDTO> toDtoCategorieCreateurCategorieSet(Set<CategorieCreateur> categorieCreateur) {
        return categorieCreateur.stream().map(this::toDtoCategorieCreateurCategorie).collect(Collectors.toSet());
    }

    @Named("reseauxSociauxNom")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "nom", source = "nom")
    ReseauxSociauxDTO toDtoReseauxSociauxNom(ReseauxSociaux reseauxSociaux);

    @Named("reseauxSociauxNomSet")
    default Set<ReseauxSociauxDTO> toDtoReseauxSociauxNomSet(Set<ReseauxSociaux> reseauxSociaux) {
        return reseauxSociaux.stream().map(this::toDtoReseauxSociauxNom).collect(Collectors.toSet());
    }

    @Named("jhiUserId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    UserDTO toDtoUserId(User user);
}
