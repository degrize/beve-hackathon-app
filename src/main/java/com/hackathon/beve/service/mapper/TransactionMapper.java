package com.hackathon.beve.service.mapper;

import com.hackathon.beve.domain.Transaction;
import com.hackathon.beve.service.dto.TransactionDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Transaction} and its DTO {@link TransactionDTO}.
 */
@Mapper(componentModel = "spring")
public interface TransactionMapper extends EntityMapper<TransactionDTO, Transaction> {}
