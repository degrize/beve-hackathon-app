package com.hackathon.beve.service.mapper;

import com.hackathon.beve.domain.CreateurAfricain;
import com.hackathon.beve.domain.Don;
import com.hackathon.beve.domain.Donnateur;
import com.hackathon.beve.domain.Transaction;
import com.hackathon.beve.service.dto.CreateurAfricainDTO;
import com.hackathon.beve.service.dto.DonDTO;
import com.hackathon.beve.service.dto.DonnateurDTO;
import com.hackathon.beve.service.dto.TransactionDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Don} and its DTO {@link DonDTO}.
 */
@Mapper(componentModel = "spring")
public interface DonMapper extends EntityMapper<DonDTO, Don> {
    @Mapping(target = "transaction", source = "transaction", qualifiedByName = "transactionNumeroMtn")
    @Mapping(target = "createurAfricain", source = "createurAfricain", qualifiedByName = "createurAfricainLabel")
    @Mapping(target = "donnateur", source = "donnateur", qualifiedByName = "donnateurPrenom")
    DonDTO toDto(Don s);

    @Named("transactionNumeroMtn")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "numeroMtn", source = "numeroMtn")
    TransactionDTO toDtoTransactionNumeroMtn(Transaction transaction);

    @Named("createurAfricainLabel")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "label", source = "label")
    CreateurAfricainDTO toDtoCreateurAfricainLabel(CreateurAfricain createurAfricain);

    @Named("donnateurPrenom")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "prenom", source = "prenom")
    DonnateurDTO toDtoDonnateurPrenom(Donnateur donnateur);
}
