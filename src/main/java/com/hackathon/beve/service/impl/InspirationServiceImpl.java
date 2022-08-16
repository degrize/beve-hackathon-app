package com.hackathon.beve.service.impl;

import com.hackathon.beve.domain.Inspiration;
import com.hackathon.beve.repository.InspirationRepository;
import com.hackathon.beve.service.InspirationService;
import com.hackathon.beve.service.dto.InspirationDTO;
import com.hackathon.beve.service.mapper.InspirationMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Inspiration}.
 */
@Service
@Transactional
public class InspirationServiceImpl implements InspirationService {

    private final Logger log = LoggerFactory.getLogger(InspirationServiceImpl.class);

    private final InspirationRepository inspirationRepository;

    private final InspirationMapper inspirationMapper;

    public InspirationServiceImpl(InspirationRepository inspirationRepository, InspirationMapper inspirationMapper) {
        this.inspirationRepository = inspirationRepository;
        this.inspirationMapper = inspirationMapper;
    }

    @Override
    public InspirationDTO save(InspirationDTO inspirationDTO) {
        log.debug("Request to save Inspiration : {}", inspirationDTO);
        Inspiration inspiration = inspirationMapper.toEntity(inspirationDTO);
        inspiration = inspirationRepository.save(inspiration);
        return inspirationMapper.toDto(inspiration);
    }

    @Override
    public InspirationDTO update(InspirationDTO inspirationDTO) {
        log.debug("Request to save Inspiration : {}", inspirationDTO);
        Inspiration inspiration = inspirationMapper.toEntity(inspirationDTO);
        inspiration = inspirationRepository.save(inspiration);
        return inspirationMapper.toDto(inspiration);
    }

    @Override
    public Optional<InspirationDTO> partialUpdate(InspirationDTO inspirationDTO) {
        log.debug("Request to partially update Inspiration : {}", inspirationDTO);

        return inspirationRepository
            .findById(inspirationDTO.getId())
            .map(existingInspiration -> {
                inspirationMapper.partialUpdate(existingInspiration, inspirationDTO);

                return existingInspiration;
            })
            .map(inspirationRepository::save)
            .map(inspirationMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<InspirationDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Inspirations");
        return inspirationRepository.findAll(pageable).map(inspirationMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<InspirationDTO> findOne(Long id) {
        log.debug("Request to get Inspiration : {}", id);
        return inspirationRepository.findById(id).map(inspirationMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Inspiration : {}", id);
        inspirationRepository.deleteById(id);
    }
}
