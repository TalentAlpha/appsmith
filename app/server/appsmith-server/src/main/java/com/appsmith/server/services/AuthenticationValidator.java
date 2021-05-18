package com.appsmith.server.services;

import com.appsmith.external.models.AuthenticationDTO;
import com.appsmith.external.models.OAuth2;
import com.appsmith.server.domains.Datasource;
import com.appsmith.server.solutions.AuthenticationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthenticationValidator {

    private final AuthenticationService authenticationService;

    public Mono<Datasource> validateAuthentication(Datasource datasource) {
        System.out.println("SELF DEBUG: validateAuthentication (AuthenticationValidator)");
        if (datasource.getDatasourceConfiguration() == null || datasource.getDatasourceConfiguration().getAuthentication() == null) {
            return Mono.just(datasource);
        }
        AuthenticationDTO authentication = datasource.getDatasourceConfiguration().getAuthentication();

        System.out.println("SELF DEBUG: validateAuthentication (AuthenticationValidator) 2: " + authentication);
        if (authentication instanceof OAuth2) {
            System.out.println("SELF DEBUG: validateAuthentication (AuthenticationValidator) 3: " + authenticationService);
            return authenticationService.refreshAuthentication(datasource);
        }
        return Mono.just(datasource);
//        return authentication.hasExpired()
//                .filter(expired -> expired)
//                .flatMap(expired -> {
//                    if (authentication instanceof OAuth2) {
//                        return authenticationService.refreshAuthentication(datasource);
//                    }
//                    return Mono.just(datasource);
//                })
//                .switchIfEmpty(Mono.just(datasource));
    }
}
