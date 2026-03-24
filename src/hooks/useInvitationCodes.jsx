// hooks/useInvitation.js
import { useState, useCallback } from "react";
import { invitationApi } from "../api/invitationApi";

export default function useInvitationCodes() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleError = (err, fallbackMessage) => {
    const message = err?.message ?? fallbackMessage;
    setError(message);
    console.error(message, err);
    return null;
  };

  const generateMyCode = useCallback(async () => {
    try {
      setLoading(true);
      const result = await invitationApi.generateMyCode();
      setError(null);
      return result;
    } catch (err) {
      return handleError(err, "Błąd generowania kodu");
    } finally {
      setLoading(false);
    }
  }, []);

  const getMyCode = useCallback(async () => {
    try {
      setLoading(true);
      const result = await invitationApi.getMyCode();
      setError(null);
      return result;
    } catch (err) {
      return handleError(err, "Błąd pobierania kodu");
    } finally {
      setLoading(false);
    }
  }, []);

  const claimStudent = useCallback(async code => {
    try {
      setLoading(true);
      const result = await invitationApi.claimStudent(code);
      setError(null);
      return result;
    } catch (err) {
      return handleError(err, "Błąd dodawania studenta");
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    generateMyCode,
    getMyCode,
    claimStudent,
  };
}
