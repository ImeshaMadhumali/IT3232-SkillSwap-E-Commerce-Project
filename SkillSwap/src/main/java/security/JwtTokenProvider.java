package security;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

import javax.crypto.SecretKey;

@Component
public class JwtTokenProvider {

    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${jwt.expiration}")
    private long jwtExpiration;

    private SecretKey getSignKey() {
        byte[] keyBytes = Decoders.BASE64.decode(jwtSecret); // Decode base64 secret
        return Keys.hmacShaKeyFor(keyBytes); // Generate secure key
    }

    public String generateToken(String email) {
        Map<String, Object> claims = new HashMap<>();
        return createToken(claims, email);
    }

    private String createToken(Map<String, Object> claims, String subject) {
        long now = System.currentTimeMillis();
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date(now))
                .setExpiration(new Date(now + jwtExpiration * 1000))
                .signWith(getSignKey(), SignatureAlgorithm.HS256) // Use secure key
                .compact();
    }

    public String getEmailFromToken(String token) {
        return getClaimFromToken(token, Claims::getSubject);
    }

    public <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = getAllClaimsFromToken(token);
        return claimsResolver.apply(claims);
    }

    private Claims getAllClaimsFromToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSignKey()) // Use secure key
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                .setSigningKey(getSignKey()) // Use secure key
                .build()
                .parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
