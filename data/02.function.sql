BEGIN;

CREATE FUNCTION "find_average_rating"(_media_id INT)
    RETURNS TABLE (media_id INT, media_average_rating NUMERIC) AS $$ 
BEGIN
    RETURN QUERY (
        SELECT "rating".media_id, AVG(value) as "media_average_rating"
        FROM "rating"
        WHERE "rating".media_id = _media_id
        GROUP BY "rating".media_id
    );
END;
$$ LANGUAGE plpgsql;

COMMIT;