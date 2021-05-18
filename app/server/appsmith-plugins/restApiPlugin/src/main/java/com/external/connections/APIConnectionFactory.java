package com.external.connections;

import com.appsmith.external.exceptions.pluginExceptions.AppsmithPluginError;
import com.appsmith.external.exceptions.pluginExceptions.AppsmithPluginException;
import com.appsmith.external.models.AuthenticationDTO;
import com.appsmith.external.models.BasicAuth;
import com.appsmith.external.models.OAuth2;
import reactor.core.publisher.Mono;


public class APIConnectionFactory {

    public static Mono<APIConnection> createConnection(AuthenticationDTO authenticationType) {
        System.out.println("SELF DEBUG: createConnection 1: " + authenticationType);
        if (authenticationType instanceof OAuth2) {
            System.out.println("SELF DEBUG: createConnection 2");
            if (OAuth2.Type.CLIENT_CREDENTIALS.equals(((OAuth2) authenticationType).getGrantType())) {
                System.out.println("SELF DEBUG: createConnection 3");
                return Mono.from(OAuth2ClientCredentials.create((OAuth2) authenticationType));
            } else if (OAuth2.Type.AUTHORIZATION_CODE.equals(((OAuth2) authenticationType).getGrantType())) {
                System.out.println("SELF DEBUG: createConnection 4");
                if (!Boolean.TRUE.equals(authenticationType.getIsAuthorized())) {
                    System.out.println("SELF DEBUG: createConnection 5");
                    return Mono.error(new AppsmithPluginException(
                            AppsmithPluginError.PLUGIN_DATASOURCE_ARGUMENT_ERROR, "Please authorize datasource"));
                }
                System.out.println("SELF DEBUG: createConnection 6");
                return Mono.from(OAuth2AuthorizationCode.create((OAuth2) authenticationType));
            } else {
                System.out.println("SELF DEBUG: createConnection 7");
                return Mono.empty();
            }
        } else if (authenticationType instanceof BasicAuth) {
            return Mono.from(BasicAuthentication.create((BasicAuth) authenticationType));
        } else {
            return Mono.empty();
        }
    }
}