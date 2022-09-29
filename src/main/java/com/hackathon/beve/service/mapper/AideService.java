package com.hackathon.beve.service.mapper;

import com.hackathon.beve.service.dto.AideDTO;

/**
 * Service Interface for managing {@link com.hackathon.beve.domain.Aide}.
 */
public interface AideService {
    /**
     * Save a aide.
     *
     * @param aideDTO the entity to save.
     * @return the persisted entity.
     */
    AideDTO save(AideDTO aideDTO);
}
