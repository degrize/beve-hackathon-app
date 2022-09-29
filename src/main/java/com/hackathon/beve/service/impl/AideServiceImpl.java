package com.hackathon.beve.service.impl;

import com.hackathon.beve.domain.Aide;
import com.hackathon.beve.repository.AideRepository;
import com.hackathon.beve.service.dto.AideDTO;
import com.hackathon.beve.service.mapper.AideMapper;
import com.hackathon.beve.service.mapper.AideService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Aide}.
 */
@Service
@Transactional
public class AideServiceImpl implements AideService {

    private final Logger log = LoggerFactory.getLogger(AideServiceImpl.class);

    private final AideRepository aideRepository;

    private final AideMapper aideMapper;

    public AideServiceImpl(AideRepository aideRepository, AideMapper aideMapper) {
        this.aideRepository = aideRepository;
        this.aideMapper = aideMapper;
    }

    @Override
    public AideDTO save(AideDTO aideDTO) {
        log.debug("Request to save Aide : {}", aideDTO);
        Aide aide = aideMapper.toEntity(aideDTO);
        aide = aideRepository.save(aide);
        return aideMapper.toDto(aide);
    }
}
