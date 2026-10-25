"use client";

import ClassroomResultGroup from "@/lib/components/SearchPage/ClassroomResultGroup";
import AuthenticatedLayout from "@/lib/components/layout/AuthenticatedLayout";
import SearchHeaderPanel from "@/lib/components/SearchPage/SearchHeaderPanel";
import UserResultGroup from "@/lib/components/SearchPage/UserResultGroup";
import SearchPanel from "@/lib/components/SearchPage/SearchPanel";
import Container from "@/lib/components/Container";

export default function SearchPage() {
  const query = "Introduction to Computer Science";
  return (
    <AuthenticatedLayout>
      <SearchHeaderPanel searchQuery={query} />
      <Container style={{ padding: "0", marginTop: "10em" }}>
        <SearchPanel />
        <ClassroomResultGroup />
        <UserResultGroup />
      </Container>
    </AuthenticatedLayout>
  );
}
