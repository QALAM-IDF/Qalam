"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { Teacher } from "@/data/teachers";
import { teachers } from "@/data/teachers";
import TeacherCard from "./TeacherCard";
import TeacherModal from "./TeacherModal";

export default function TeachersSection() {
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {teachers.map((teacher, index) => (
          <TeacherCard
            key={teacher.id}
            teacher={teacher}
            index={index}
            onClick={() => setSelectedTeacher(teacher)}
          />
        ))}
      </div>
      <TeacherModal
        teacher={selectedTeacher}
        onClose={() => setSelectedTeacher(null)}
      />
    </>
  );
}
