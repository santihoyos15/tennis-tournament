import { Tournament } from "@prisma/client";

export const createTournament = async (tournamentDto: Tournament) => {
  try {
    if (!tournamentDto.name) {
      throw new Error("name required");
    }

    if (!tournamentDto.description) {
      throw new Error("description required");
    }

    if (!tournamentDto.createdBy) {
      throw new Error("createdBy required");
    }

    const tournament = await prisma.tournament.create({
      data: {
        name: tournamentDto.name,
        description: tournamentDto.description,
        createdBy: tournamentDto.createdBy,
      },
    });

    return tournament;
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export const getTournamentsByUserId = async (userId: number) => {
  try {
    if (!userId) {
      throw new Error("name required");
    }

    const tournaments = await prisma.tournament.findMany({
      where: {
        createdBy: userId,
      },
    });

    if (tournaments.length === 0) {
      throw new Error("No records found");
    }

    return tournaments;
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export const getAllTournaments = async () => {
  try {
    const tournaments = await prisma.tournament.findMany();

    if (tournaments.length === 0) {
      throw new Error("No records found");
    }

    return tournaments;
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export const getTournamentById = async (tournamentId: number) => {
  try {
    if (!tournamentId) {
      throw new Error("id required");
    }

    const tournament = await prisma.tournament.findUnique({
      where: {
        id: tournamentId,
      },
    });

    return tournament;
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export const updateTournament = async (tournamentDto: Tournament) => {
  try {
    if (!tournamentDto.id) {
      throw new Error("id required");
    }

    if (!tournamentDto.createdBy) {
      throw new Error("createdBy required");
    }

    if (!tournamentDto.name) {
      throw new Error("name required");
    }

    if (!tournamentDto.description) {
      throw new Error("description required");
    }

    const tournament = await prisma.tournament.update({
      data: {
        name: tournamentDto.name,
        description: tournamentDto.description,
      },
      where: { id: tournamentDto.id, createdBy: tournamentDto.createdBy },
    });

    return tournament;
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export const deleteTournament = async (tournamentDto: Tournament) => {
  try {
    if (!tournamentDto.id) {
      throw new Error("id required");
    }

    const tournament = await prisma.tournament.delete({
      where: { id: tournamentDto.id, createdBy: tournamentDto.createdBy },
    });

    return tournament;
  } catch (e: any) {
    throw new Error(e.message);
  }
};
