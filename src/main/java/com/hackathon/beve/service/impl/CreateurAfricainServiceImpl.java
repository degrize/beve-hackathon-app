package com.hackathon.beve.service.impl;

import com.hackathon.beve.domain.CreateurAfricain;
import com.hackathon.beve.domain.User;
import com.hackathon.beve.domain.enumeration.EtatCompte;
import com.hackathon.beve.repository.CreateurAfricainRepository;
import com.hackathon.beve.repository.UserRepository;
import com.hackathon.beve.service.CreateurAfricainService;
import com.hackathon.beve.service.dto.AdminUserDTO;
import com.hackathon.beve.service.dto.CreateurAfricainDTO;
import com.hackathon.beve.service.mapper.CreateurAfricainMapper;
import com.hackathon.beve.web.rest.AccountResource;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link CreateurAfricain}.
 */
@Service
@Transactional
public class CreateurAfricainServiceImpl implements CreateurAfricainService {

    private final Logger log = LoggerFactory.getLogger(CreateurAfricainServiceImpl.class);

    private final CreateurAfricainRepository createurAfricainRepository;

    private final CreateurAfricainMapper createurAfricainMapper;

    @Autowired
    private AccountResource accountResource;

    @Autowired
    private UserRepository userRepository;

    public CreateurAfricainServiceImpl(
        CreateurAfricainRepository createurAfricainRepository,
        CreateurAfricainMapper createurAfricainMapper
    ) {
        this.createurAfricainRepository = createurAfricainRepository;
        this.createurAfricainMapper = createurAfricainMapper;
    }

    @Override
    public CreateurAfricainDTO save(CreateurAfricainDTO createurAfricainDTO) {
        log.debug("Request to save CreateurAfricain : {}", createurAfricainDTO);
        CreateurAfricain createurAfricain = createurAfricainMapper.toEntity(createurAfricainDTO);

        AdminUserDTO adminUserDTO = new AdminUserDTO();
        adminUserDTO = accountResource.getAccountUser();
        Optional<User> existingUser = userRepository.findOneByEmailIgnoreCase(adminUserDTO.getEmail());
        createurAfricain.setUser(existingUser.get());

        createurAfricain.setEtatCompte(EtatCompte.NORMAL);

        createurAfricain = createurAfricainRepository.save(createurAfricain);
        return createurAfricainMapper.toDto(createurAfricain);
    }

    @Override
    public CreateurAfricainDTO update(CreateurAfricainDTO createurAfricainDTO) {
        log.debug("Request to save CreateurAfricain : {}", createurAfricainDTO);
        CreateurAfricain createurAfricain = createurAfricainMapper.toEntity(createurAfricainDTO);

        AdminUserDTO adminUserDTO = new AdminUserDTO();
        adminUserDTO = accountResource.getAccountUser();
        Optional<User> existingUser = userRepository.findOneByEmailIgnoreCase(adminUserDTO.getEmail());

        createurAfricain.setUser(existingUser.get());

        createurAfricain = createurAfricainRepository.save(createurAfricain);
        return createurAfricainMapper.toDto(createurAfricain);
    }

    @Override
    public Optional<CreateurAfricainDTO> partialUpdate(CreateurAfricainDTO createurAfricainDTO) {
        log.debug("Request to partially update CreateurAfricain : {}", createurAfricainDTO);

        return createurAfricainRepository
            .findById(createurAfricainDTO.getId())
            .map(existingCreateurAfricain -> {
                createurAfricainMapper.partialUpdate(existingCreateurAfricain, createurAfricainDTO);

                return existingCreateurAfricain;
            })
            .map(createurAfricainRepository::save)
            .map(createurAfricainMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<CreateurAfricainDTO> findAll(Pageable pageable) {
        log.debug("Request to get all CreateurAfricains");
        return createurAfricainRepository.findAll(pageable).map(createurAfricainMapper::toDto);
    }

    public Page<CreateurAfricainDTO> findAllWithEagerRelationships(Pageable pageable) {
        return createurAfricainRepository.findAllWithEagerRelationships(pageable).map(createurAfricainMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<CreateurAfricainDTO> findOne(Long id) {
        log.debug("Request to get CreateurAfricain : {}", id);
        return createurAfricainRepository.findOneWithEagerRelationships(id).map(createurAfricainMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete CreateurAfricain : {}", id);
        createurAfricainRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public List<CreateurAfricain> findAllNoPageble() {
        log.debug("Request to get list of Createurs Africains No peagable");
        return createurAfricainRepository.findAllWithEagerRelationships();
    }

    @Override
    public CreateurAfricain findUser(Long id) {
        CreateurAfricain existingMandataireDelegateur = createurAfricainRepository.findByJhiUserId(id);
        return existingMandataireDelegateur;
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<CreateurAfricainDTO> findOneByLabel(String label) {
        log.debug("Request to get CreateurAfricain by Label : {}", label);
        return createurAfricainRepository.findCreateurAfricainByLabel(label).map(createurAfricainMapper::toDto);
    }

    @Override
    public CreateurAfricainDTO updateEtatCompte(CreateurAfricainDTO createurAfricainDTO) {
        log.debug("Request to save CreateurAfricain : {}", createurAfricainDTO);
        CreateurAfricain createurAfricain = createurAfricainMapper.toEntity(createurAfricainDTO);
        createurAfricain = createurAfricainRepository.save(createurAfricain);
        return createurAfricainMapper.toDto(createurAfricain);
    }
}
